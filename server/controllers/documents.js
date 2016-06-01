(function () {
  'use strict';

  var Document = require('../models').Document;
  var Role = require('../models').Role;
  var utils = require('../utils');
  var runQuery = utils.runQuery;
  var resolveError = utils.resolveError;
  var emitSocketEvent = utils.emitSocketEvent;

  var documentsController = {
    /**
     * Create a document.
     */
    create: function (req, res) {
      var data = req.body;
      data.role = data.role || 'public';
      Role
        .findOne({ title: data.role })
        .exec(function (err, role) {
          if (err) {
            return resolveError(err, res);
          }
          Document
            .create({
              title: data.title,
              content: data.content,
              owner: req.decoded._id,
              role: role._id
            }, function (err, doc) {
              if (err) {
                return resolveError(err, res);
              }
              Document
                .findOne({ _id: doc._id })
                .exec(function (err, doc) {
                  if (err) {
                    return resolveError(err, res);
                  }
                  if (global.io) {
                    emitSocketEvent(global.io, doc, 'document:create');
                  }
                  return res.status(201).send(doc);
                });
            });
        });
    },

    /**
     * List all documents according to the given criteria.
     */
    list: function (req, res) {
      var queryParams = req.query;
      var query = Document.find({})
        .limit(Number(queryParams.limit) || null)
        .sort('-createdAt'); // Sort the documents in descending order.

      return runQuery(req, query).then(function (docs) {
        return res.status(200).send(docs);
      }).catch(function (err) {
        return resolveError(err, res, 400);
      });
    },

    /**
     * Fetch a single document.
     */
    retrieve: function (req, res) {
      Document.findOne({_id: req.params.doc_id}).exec(function (err, doc) {
        if (err) {
          return resolveError(err, res);
        }
        if (!doc) {
          return res.status(404).send({
            message: 'Document not found.'
          });
        }
        return res.status(200).send(doc);
      });
    },

    /**
     * Update a document.
     */
    update: function (req, res) {
      Document.findOne({_id: req.params.doc_id})
        .exec(function (err, doc) {
          if (err) {
            return resolveError(err, res);
          }
          if (!doc) {
            return res.status(404).send({
              message: 'Document not found.'
            });
          }

          if (req.body.title) doc.title = req.body.title;
          if (req.body.content) doc.content = req.body.content;
          if (req.body.role && typeof req.body.role === 'string') {
            Role.findOne({title: req.body.role}, function (err, role) {
              if (err) {
                return resolveError(err, res);
              }

              // Determine whether we're changing documents role.
              var roleHasChanged = doc.role.title !== role.title;

              doc.role = role._id;
              doc.save(function (err) {
                if (err) {
                  return resolveError(err, res);
                }
                // Have to findOne here else role will not be populated.
                Document
                  .findOne({ _id: doc._id })
                  .exec(function (err, doc) {
                    if (err) {
                      return resolveError(err, res);
                    }
                    if (global.io) {
                      if (roleHasChanged) {
                        emitSocketEvent(
                          global.io, doc, 'document:role-update', true);
                      } else {
                        emitSocketEvent(global.io, doc, 'document:update');
                      }
                    }
                    return res.status(200).send(doc);
                  });
              });
            });
          } else {
            doc.save(function (err) {
              if (err) {
                return resolveError(err, res);
              }
              emitSocketEvent(global.io, doc, 'document:update');
              return res.status(200).send(doc);
            });
          }
        });
    },

    /**
     * Delete a single document.
     */
    delete: function (req, res) {
      Document.findOne({_id: req.params.doc_id})
        .remove()
        .exec(function (err, docsRemoved) {
          if (err) {
            return resolveError(err, res);
          }
          if (!docsRemoved) {
            return res.status(404).send({
              message: 'Document not found.'
            });
          }
          if (global.io) {
            emitSocketEvent(
              global.io, req.params.doc_id, 'document:delete', true);
          }
          return res.status(204).send({});
        });
    }
  };

  module.exports = documentsController;
})();
