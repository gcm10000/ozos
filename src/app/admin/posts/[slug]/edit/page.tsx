'use client'
import { useParams } from 'next/navigation';
import PostForm from '../../form/page';

export default function EditPostPage() {
  const { id } = useParams();
  return <PostForm />;
}