"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { X, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function UploadPage() {
  const [isOpen, setIsOpen] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
    },
    maxFiles: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)

    // Simulating upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setUploadProgress(i)
    }

    // TODO: Implement actual API call to upload video
    console.log("Uploading video:", formData)
    
    // Reset form after upload
    setFile(null)
    setTitle("")
    setDescription("")
    setUploadProgress(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upload a Video
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-center text-muted-foreground">
            Upload your video advertisement
          </p>

          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-10
              flex flex-col items-center justify-center
              cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
            `}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="text-center space-y-4">
                <p className="font-medium">{file.name}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove file
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Drag and drop video files to upload</p>
                </div>
                <Button variant="outline" size="sm">
                  Select files
                </Button>
              </div>
            )}
          </div>

          {file && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your video a title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {uploadProgress > 0 && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="guide">
              <AccordionTrigger>Step-by-step guide</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Select or drag and drop your video file</li>
                  <li>Ensure your video meets the minimum quality requirements</li>
                  <li>Add a title and description</li>
                  <li>Review your upload</li>
                  <li>Click &quot;Upload Video&quot; to complete the upload</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!file || !title || uploadProgress > 0}
            >
              Upload Video
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

