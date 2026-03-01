import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContextProvider';
import ProtCard from '../../protCard/ProtCard';
import Loading from '../../Loading/Loading';
import { useMutation, useQuery } from '@tanstack/react-query';
import IsError from '../../Components/isError/IsError';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, } from "@heroui/react";
import { FaFileImage } from 'react-icons/fa';
import imgUrl from "../../assets/react.svg"
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import ErrorMessage from '../../Components/ErorMassege/ErrorMassege';



export default function Home() {

  let { token } = useContext(AuthContext)


  async function GetAllPosts() {


    return axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      headers: {
        token: token
      }
    })




  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  let { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryFn: GetAllPosts,
    queryKey: "allPosts",
  })

  const imageRef = useRef(null)
  const postContentRef = useRef(null)
  const [imageUrlState, setImageUrlState] = useState(null)

  function imagePreview() {


    let imageValue = imageRef.current.files[0]
    console.log(imageValue);


    let imageAsUrl = URL.createObjectURL(imageValue)
    console.log(imageAsUrl);

    setImageUrlState(imageAsUrl)

  }

  function clearImage() {
    setImageUrlState(null)
    imageRef.current.value = ""
  }

  async function creatPost() {

    let postImage = imageRef.current.files[0]
    let postBody = postContentRef.current.value

    let formData = new FormData()

    if (postBody) {
      formData.append("body", postBody)
    }
    if (postImage) {
      formData.append("image", postImage)
    }



    return axios.post(`${import.meta.env.VITE_API_URL}/posts`, formData, {
      headers: {
        token: token
      }
    })

  }

  let { isPending, mutate } = useMutation({
    mutationFn: creatPost,
    onSuccess: function (data) {
      console.log(data);
      clearImage()
      postContentRef.current.value = ""
      onOpenChange(false)
      refetch()
      toast.success("post Created", {
        position: 'top-center',
        autoClose: 2000
      })
    },
    onError: function (error) {
      console.log(error);
      toast.error(" No post selected!",{
        position:"top-center",
        autoClose:2000
      })

    }
  })

  if (isLoading) {
    return <Loading count={5} />
  }

  if (isError) {
    return <IsError refetch={refetch} />
  }








  return (
    <>



      <div className="flex justify-center">
        <Button className='bg-sky-500 w-1/4 font-semibold   hover:bg-sky-600 text-white px-6 py-6 rounded-full shadow-[0_3px_17px_rgba(0,0,0,0.5)] transition' onPress={onOpen}>
          Creat Post
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Creat Post</ModalHeader>
              <ModalBody>


                <textarea ref={postContentRef} name="" className='p-3 rounded-2xl border' rows={3} id=""></textarea>

                <input onChange={imagePreview} ref={imageRef} className='hidden' type="file" id='fileInput' />
                <label className='cursor-pointer bg-gray-300 p-2 rounded-xl w-fit flex items-center gap-2' htmlFor="fileInput"> <FaFileImage /> Uplaod Photo</label>
                {imageUrlState && <div className='relative'>
                  <img className='w-full ' src={imageUrlState} alt="file" />
                  <IoClose onClick={clearImage} className='absolute top-3 right-3 cursor-pointer text-2xl' />
                </div>}

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" disabled={isPending} onClick={mutate}>
                  {isPending ? "loading..." : "Creat Post"}

                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {data?.data?.data?.posts?.map((post) => <ProtCard key={post.id} post={post} isHome={true} />)}


    </>
  )
}
