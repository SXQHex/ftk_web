"use client"
import { LoaderCircle } from "lucide-react"
import { Button } from "../ui/button"
import { ReactNode } from "react"


interface SubmitBtnProps {
    isPending: boolean
    children: ReactNode
}

export const SubmitBtn = ({isPending, children}: SubmitBtnProps) => {
    return (
        <Button 
            type="submit"
            disabled={isPending} 
            className="bg-indigo-900 hover:bg-indigo-900/90 w-full">
            {isPending && <LoaderCircle className="animate-spin mr-2"/>} {children}
        </Button>
    )
}
