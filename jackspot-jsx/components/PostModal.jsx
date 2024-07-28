'useClient';

import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';

import Modal from './Modal'
import usePostModal from '@/hooks/usePostModal'
import Input from './Input';
import Button from './Button';

function PostModal() {

    const [isLoading, setIsLoading] = useState(false);

    const postModal = usePostModal();
    const router = useRouter();

    const { register, handleSubmit, reset} = useForm({
        defaultValues: {
            title: ''
        }
    })

    function onChange(open) {
        if (!open) {
            reset();
            postModal.onClose();
        }
    }

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);

            const payload = {
                title: values.title,
                user_id: 1
            };

            const response = await fetch('http://127.0.0.1:5555/api/1/collections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            console.log('Submission successful', data);
            
            router.refresh();
            setIsLoading(false);
            toast.success('Collection created');
            reset();
            postModal.onClose();


        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
  
    return (

    <Modal 
        title='Add a Collection' 
        description='Name your collection' 
        isOpen={postModal.isOpen} 
        onChange={onChange}
    >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <Input id='title' disabled={isLoading} {...register('title', { required: true })} placeholder='Collection Title' />
            <Button disabled={isLoading} type="submit">
                Add
            </Button>
        </form>
    </ Modal>
  )
}

export default PostModal