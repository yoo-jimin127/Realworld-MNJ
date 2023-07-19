import { Link } from 'react-router-dom';
import { Comment } from '../../apis/types';

function CommentCard({
  comment,
  handleDeleteComment,
}: {
  comment: Comment;
  handleDeleteComment: (id: number) => Promise<void>;
}) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img alt="" src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">{comment.createdAt}</span>
        <span className="mod-options">
          <i
            className="ion-trash-a"
            role="presentation"
            onClick={() => handleDeleteComment(comment.id)}
            onKeyDown={() => handleDeleteComment(comment.id)}
          />
        </span>
      </div>
    </div>
  );
}

export default CommentCard;
