"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { ArrowRightIcon } from "lucide-react"
import { onboardingSteps } from "./static/onboardings"
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

export default function Onboarding() {
    const [step, setStep] = useState(1)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const lastShown = localStorage.getItem('onboardingLastShown')
        const currentTime = new Date().getTime()
        const sevenDays = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

        if (!lastShown || currentTime - parseInt(lastShown) > sevenDays) {
            setShowModal(true)
            localStorage.setItem('onboardingLastShown', currentTime.toString())
        }
    }, [])

    const totalSteps = onboardingSteps.length

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

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <AlertDialog
            open={showModal}
            onOpenChange={(open) => {
                if (open) setStep(1)
                if (!open) handleClose()
            }}
        >
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">Onboarding</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent className="gap-0 p-0">
                <div className="space-y-6 px-6 pt-3 pb-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{onboardingSteps[step - 1].title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {onboardingSteps[step - 1].description}
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
                                    <Button type="button" onClick={handleClose}>Okay</Button>
                                </AlertDialogCancel>
                            )}
                        </AlertDialogFooter>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};