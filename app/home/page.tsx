import React from 'react'
import { getCurrentUser } from '@/lib/current-user'

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Ranterr</h1>
      <p className="mb-6">Your go-to platform for sharing thoughts and ideas.</p>
      
      {user ? (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Current User</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Username:</span> {user.username}</p>
            <p><span className="font-medium">User ID:</span> {user.id}</p>
            <p><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Please log in to see your details.</p>
      )}
    </div>
  )
}
