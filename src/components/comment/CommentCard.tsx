import { Link } from 'react-router-dom';
import { Comment } from '../../apis/types';

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author}`} className="comment-author">
          <img alt="" src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author}`} className="comment-author">
          Jacob Schmidt
        </Link>
        <span className="date-posted">{comment.createdAt}</span>
        <span className="mod-options">
          <i className="ion-edit" />
          <i className="ion-trash-a" />
        </span>
      </div>
    </div>
  );
}

export default CommentCard;
