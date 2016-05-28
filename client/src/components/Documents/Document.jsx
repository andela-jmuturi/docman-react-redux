import md5 from 'blueimp-md5';
import classNames from 'classnames';

import React, {PropTypes} from 'react';

import {Card, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';

const Document = (props) => {
  // Construct a url for this document owner's gravatar.
  const owner = props.document.owner;
  const ownerGravatar = `http://www.gravatar.com/avatar/${owner
    ? md5(owner.email) : ''}?d=identicon`;

  const updatedAt = new Date(props.document.updatedAt);

  // Dynamically determine what classes to apply to the document view in order
  // to assure reponsiveness while accounting for content length.
  const cardClasses = (doc, expandedDocId) => {
    const lgClass = doc.content.length > 250 && expandedDocId === doc._id
      ? '12' : '6';

    return classNames({
      'col-xs-12': true,
      'col-sm-12': true,
      'col-md-12': true,
      [`col-lg-${lgClass}`]: true
    });
  };

  return (
    <div className={cardClasses(props.document, props.expandedDocId)}>
      <Card
        expanded={props.expandedDocId === props.document._id}
        style={{marginBottom: '0.5em'}}
        zDepth={props.expandedDocId === props.document._id ? 3 : 0}
      >
        <CardHeader
          avatar={ownerGravatar + '&s=40'}
          style={{'paddingBottom': '0.5em'}}
          subtitle={owner && owner.role ? owner.role.title : ''}
          title={owner.name
            ? `${owner.name.firstName + ' ' + owner.name.lastName}`
            : owner.username
          }
        />
        <CardTitle
          style={{'paddingTop': '0.5em'}}
          subtitle={
            `${updatedAt.toDateString()}, ${updatedAt.toLocaleTimeString()}`}
          title={props.document.title}
        />
        {props.document.content.length > 250 && props.expandedDocId !== props.document._id
          ? <CardText>
              <span>{props.document.content.slice(0, 250)}</span><br/>
              <IconButton
                onClick={function () {
                  props.onExpandChange(props.document._id);
                }}
                tooltip='View More'
              >
                <MoreHorizIcon/>
              </IconButton>
            </CardText>
          : <CardText>
              {props.document.content}
            </CardText>
        }
        <CardText expandable>
          <span>{props.document.content}</span><br/>
          <IconButton
            onClick={function () {
              props.onExpandChange();
            }}
            tooltip='View Less'
          >
            <ExpandLess/>
          </IconButton>
        </CardText>
      </Card>
    </div>
  );
};

Document.propTypes = {
  document: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      role: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }).isRequired,
  expandedDocId: PropTypes.string.isRequired,
  onExpandChange: PropTypes.func.isRequired
};

export default Document;
