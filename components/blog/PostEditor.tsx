import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface PostEditorProps {
  initialContent?: string
  onChange: (content: string) => void
}

export default function PostEditor({ initialContent = '', onChange }: PostEditorProps) {
  const [content, setContent] = useState(initialContent)

  const handleChange = (value: string) => {
    setContent(value)
    onChange(value)
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-sm"
    >
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        className="h-64"
      />
    </motion.div>
  )
}