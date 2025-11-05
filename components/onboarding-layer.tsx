"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "./ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowRightIcon } from "lucide-react"

export default function Onboarding() {
    const [step, setStep] = useState(1)
    const stepContent = [
        {
            title: "Welcome to coss.com",
            description:
                "Discover a powerful collection of components designed to enhance your development workflow.",
        },
        {
            title: "Customizable Components",
            description:
                "Each component is fully customizable and built with modern web standards in mind.",
        },
        {
            title: "Ready to Start?",
            description:
                "Begin building amazing interfaces with our comprehensive component library.",
        },
        {
            title: "Get Support",
            description:
                "Access our extensive documentation and community resources to make the most of coss.com.",
        },
    ]

    const totalSteps = stepContent.length

    const handleContinue = () => {
        if (step < totalSteps) {
            setStep(step + 1)
        }
    }

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    return (
        <AlertDialog
            defaultOpen={true}
            onOpenChange={(open) => {
                if (open) setStep(1)
            }}
        >
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">Onboarding</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent className="gap-0 p-0">
                <div className="space-y-6 px-6 pt-3 pb-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{stepContent[step - 1].title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {stepContent[step - 1].description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex justify-center space-x-1.5 max-sm:order-1">
                            {[...Array(totalSteps)].map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "size-1.5 rounded-full bg-primary",
                                        index + 1 === step ? "bg-primary w-4 transition-all duration-100" : "opacity-20"
                                    )}
                                />
                            ))}
                        </div>
                        <AlertDialogFooter>
                            {step > 1 && (
                                <Button type="button" variant="ghost" onClick={handlePrevious}>
                                    Previous
                                </Button>
                            )}
                            {step < totalSteps ? (
                                <Button
                                    className="group"
                                    type="button"
                                    onClick={handleContinue}
                                >
                                    Next
                                    <ArrowRightIcon
                                        className="opacity-60 transition-transform group-hover:translate-x-0.5"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Button>
                            ) : (
                                <AlertDialogCancel asChild>
                                    <Button type="button">Okay</Button>
                                </AlertDialogCancel>
                            )}
                        </AlertDialogFooter>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>



    );
};