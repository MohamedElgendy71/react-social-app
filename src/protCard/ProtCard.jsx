import React, { useContext, useRef } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, User, user } from "@heroui/react";
import { AiFillLike } from 'react-icons/ai';
import { FaComment, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';


export default function ProtCard({ post, isHome, comments }) {

    let queryClient = useQueryClient()

    let inputRef = useRef(null)

    let { token } = useContext(AuthContext)

    const tokenAfterDecoded = jwtDecode(token)

    async function creatComment() {
        let userComment = inputRef.current.value

        let formData = new FormData()

        formData.append("content", userComment)

        return await axios.post(`${import.meta.env.VITE_API_URL}/posts/${post._id}/comments`, formData, {
            headers: {
                token: token
            }
        })




    }


    let { isPending, mutate } = useMutation({
        mutationFn: creatComment,
        onSuccess: function (data) {
            inputRef.current.value = ""
            queryClient.invalidateQueries(["Comments", post._id])
        }
    })


    async function deletePost() {
        return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
            headers: {
                token: token
            }
        })

    }

    let { isPending: isPendingPost, mutate: deleteMutate } = useMutation({
        mutationFn: deletePost,
        onSuccess: ()=> {
            toast.success("Post deleted!",{
                autoClose:2000,
                position:"top-center"
            });
            queryClient.invalidateQueries(["allPosts"])
            ;
        },
        onError: (err) => {
            toast.error("Failed to delete post");
            console.log(err);
        }

    })

    



    return (
        <>

            <Card className="max-w-3xl my-5 mx-auto">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={post?.user?.photo}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{post?.user?.name}</h4>

                            {isHome ? <Link to={`/postData/${post._id}`}>
                                <h5 className="text-small tracking-tight text-default-400">{new Date(post?.createdAt).toLocaleString("en-us", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit"
                                })}</h5>
                            </Link> : <h5 className="text-small tracking-tight text-default-400">{new Date(post?.createdAt).toLocaleString("en-us", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                            })}</h5>}




                        </div>
                    </div>
                    {post.user._id === tokenAfterDecoded.user && <Dropdown>
                        <DropdownTrigger>
                            <SlOptions className='cursor-pointer' />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="edit">Edit Post</DropdownItem>
                            <DropdownItem onClick={deleteMutate} key="delete" className="text-danger" color="danger">
                                Delete Post
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>}
                </CardHeader>
                <CardBody className="px-3 py-0 text-small ">
                    <p>{post.body}</p>
                    {post?.image && <img src={post?.image} alt={post?.body} />}

                </CardBody>
                <CardFooter className="gap-3 justify-between flex-col">

                    <div className=' bg-gray-200 p-3 rounded-2xl flex justify-between items-center w-full '>
                        <div className='flex items-center gap-1'>
                            <AiFillLike />

                            <p>Like</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <FaComment />

                            <p>Comment</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <FaShare />

                            <p>Share</p>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center w-full'>
                        <input placeholder='enter your comment' type="text" ref={inputRef} className='border p-3 rounded-2xl w-full' />
                        <Button disabled={isPending} onPress={mutate} className='bg-sky-600 text-white'>{isPending ? "loading..." : "comment"}</Button>
                    </div>


                    <div className='comment w-full'>

                        {post.topComment && <div className='bg-gray-200 p-3 rounded-2xl'>

                            <User
                                avatarProps={{
                                    src: post?.topComment.commentCreator.photo,
                                }}

                                name={post?.topComment.commentCreator.name}
                            />

                            <p>{post?.topComment.content}</p>

                        </div>}

                        {comments?.map(comment => <div className='bg-gray-200 my-3 p-3 rounded-2xl'>

                            <div className='flex justify-between items-start'>
                                <div className='flex flex-col'>
                                    <User
                                        avatarProps={{ src: comment?.commentCreator.photo }}
                                        name={comment?.commentCreator.name}
                                    />
                                    <span className='text-gray-400 font-light mt-1'>
                                        {new Date(comment?.createdAt).toLocaleString("en-us", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })}
                                    </span>
                                </div>

                                {post.user._id === tokenAfterDecoded.user && (
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <SlOptions className='cursor-pointer' />
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem key="edit">Edit Comment</DropdownItem>
                                            <DropdownItem  key="delete" className="text-danger" color="danger">
                                                Delete Comment
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                )}
                            </div>


                            <p>{comment?.content}</p>

                        </div>)}

                    </div>

                </CardFooter>
            </Card>
        </>
    )
}
