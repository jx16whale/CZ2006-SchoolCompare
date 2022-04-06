import React from 'react'
import Time from "../../Components/DatePosted"
import { useAuth } from "../../Firebase"
import AddComment from "./AddComment"
import { useNavigate } from 'react-router-dom';
import avatar from "../../PagesCSS/Dashboard/avatar.png";


function Comment({ comment, replies, getReplies, activeComment, setActiveComment, updateComment, addComment }) {

    // TODO: CSS
    const user = useAuth()
    const editTime = 300000;
    const timePassed = (new Date() - comment.values.createdAt.toDate()) > editTime
    const canEdit = user && comment.author.uid === user.uid && !timePassed
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const parentId = comment.id
    const postId = comment.values.postId
    const navigate = useNavigate();
    return (
        <div className='comment'>
            <div className='comment-image-container'>
                {/* <img /> */}
                <img className="post-user-img"
                    src={comment.author.photoURL ? comment.author.photoURL : avatar}
                    alt="avatar" />
            </div>
            <div className='comment-right-part'>

                <div className='comment-content'>
                    {/*Author*/}
                    <div className='comment-author'>
                        {comment.author.name}
                    </div>
                    <Time content={comment} />
                </div>

                {/* Edit Comment or comment body */}
                {!isEditing ?
                    <div className='comment-text'>
                        {comment.values.body}
                    </div> :
                    <AddComment
                        submitLabel='Update'
                        hasCancelButton
                        initialText={comment.values.body}
                        handleSubmit={(text) => {
                            updateComment(text, comment.id)
                            setActiveComment(null)
                        }}
                        handleCancel={() => setActiveComment(null)}
                    />
                }

                {/* Comment Actions*/}
                <div className='comment-actions'>
                    <div
                        className='comment-action'
                        onClick={() => user ? setActiveComment({ id: comment.id, type: 'replying' }) : navigate("/login")} >
                        Reply
                    </div>
                    {canEdit && (
                        <div
                            className='comment-action'
                            onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>
                            Edit
                        </div>
                    )}
                </div>


                {/* To Reply*/}
                {isReplying && (
                    <AddComment
                        submitLabel="Reply"
                        handleSubmit={(text) => {
                            addComment(text, postId, parentId)
                            setActiveComment(null)
                        }}
                    />
                )}

                {/* Nested Replies*/}
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                replies={getReplies(reply.id)}
                                getReplies={getReplies}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                updateComment={updateComment}
                                addComment={addComment}
                                parentId={parentId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment