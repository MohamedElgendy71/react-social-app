import React from 'react'
import { Card, CardBody, Button } from "@heroui/react";

export default function IsError({refetch}) {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <Card className="p-6 text-center max-w-md">
                    <CardBody>
                        <h2 className="text-2xl font-bold text-danger mb-2">
                            Something went wrong ❌
                        </h2>
                        <p className="text-default-500 mb-4">
                            We couldn't load the data. Please try again.
                        </p>
                        <Button color="danger" onPress={refetch}>
                            Try Again
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
