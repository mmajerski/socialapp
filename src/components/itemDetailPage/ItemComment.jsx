import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Header, Comment } from "semantic-ui-react";
import moment from "moment";

import { itemCommentsRef } from "../../firebase/firebaseService";

import userImg from "../../images/user.png";
import AddCommentForm from "./AddCommentForm";
import { convertObjectToArray } from "../../utils/convertObjectToArray";
import { onComment } from "../../redux/actions/itemActions";
import { Link } from "react-router-dom";
import { convertDateStringToMomentObj } from "../../utils/convertDateStringToMomentObj";
import { createDataTree } from "../../utils/createDataTree";

const ItemComment = ({ itemId, isMember }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.item);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null
  });

  const handleCloseReplyForm = () => {
    setShowReplyForm({ open: false, commentId: null });
  };

  useEffect(() => {
    if (isMember) {
      itemCommentsRef(itemId).on("value", (snapshot) => {
        if (!snapshot.exists) {
          return;
        }
        dispatch(onComment(convertObjectToArray(snapshot.val()).reverse()));
      });
    } else {
      dispatch(onComment([]));
      itemCommentsRef().off();
    }
  }, [itemId, dispatch, isMember]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="grey"
        style={{ border: "none" }}
      >
        <Header as="h3">Comments</Header>
      </Segment>

      <Segment attached>
        {isMember ? (
          <>
            <Comment.Group>
              <AddCommentForm itemId={itemId} parentId={0} />
              {comments &&
                createDataTree(comments).map((comment) => {
                  return (
                    <Comment key={comment.id}>
                      <Comment.Avatar src={comment.photoURL || userImg} />
                      <Comment.Content>
                        <Comment.Author
                          as={Link}
                          to={`/profile/${comment.uid}`}
                        >
                          {comment.username}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>
                            {moment(
                              convertDateStringToMomentObj(comment.dateString)
                            ).fromNow()}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {comment.text.split("\n").map((text, i) => {
                            return (
                              <span key={i}>
                                {text}
                                <br />
                              </span>
                            );
                          })}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() =>
                              setShowReplyForm({
                                open: true,
                                commentId: comment.id
                              })
                            }
                          >
                            Reply
                          </Comment.Action>
                          {showReplyForm.open &&
                            showReplyForm.commentId === comment.id && (
                              <AddCommentForm
                                itemId={itemId}
                                parentId={comment.id}
                                closeForm={handleCloseReplyForm}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                      {comment.childNodes.length > 0 && (
                        <Comment.Group>
                          {comment.childNodes.map((child) => {
                            return (
                              <Comment key={child.id}>
                                <Comment.Avatar
                                  src={child.photoURL || userImg}
                                />
                                <Comment.Content>
                                  <Comment.Author
                                    as={Link}
                                    to={`/profile/${child.uid}`}
                                  >
                                    {child.username}
                                  </Comment.Author>
                                  <Comment.Metadata>
                                    <div>
                                      {moment(
                                        convertDateStringToMomentObj(
                                          child.dateString
                                        )
                                      ).fromNow()}
                                    </div>
                                  </Comment.Metadata>
                                  <Comment.Text>
                                    {child.text.split("\n").map((text, i) => {
                                      return (
                                        <span key={i}>
                                          {text}
                                          <br />
                                        </span>
                                      );
                                    })}
                                  </Comment.Text>
                                </Comment.Content>
                              </Comment>
                            );
                          })}
                        </Comment.Group>
                      )}
                    </Comment>
                  );
                })}
            </Comment.Group>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>Comments are visible only for members.</p>
          </div>
        )}
      </Segment>
    </>
  );
};

export default ItemComment;
