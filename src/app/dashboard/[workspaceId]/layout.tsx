import { onAuthnticateUser } from '@/actions/user'
import { getAllUserVideos, getNotifications, getWorkSpaces, verifyAccessToWorkspace } from '@/actions/workspace'
import { redirect } from 'next/navigation'
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getWorkspaceFolders } from '@/actions/workspace'

import React from 'react'
import Sidebar from '@/components/global/sidebar'

type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = async ({ params: { workspaceId }, children }: Props) => {
    const auth = await onAuthnticateUser()
    if (!auth?.user?.workspace) redirect('/auth/sign-in')
    if (!auth?.user?.workspace.length) redirect('/auth/sign-in')

    const hasAccess = await verifyAccessToWorkspace(workspaceId)

    if (hasAccess.status !== 200) {
        redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }

    if (!hasAccess.data?.workspace) return null

    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ['workspace-folders'],
        queryFn: () => getWorkspaceFolders(workspaceId)
    })

    await query.prefetchQuery({
        queryKey: ['user-videos'],
        queryFn: () => getAllUserVideos(workspaceId)
    })

    await query.prefetchQuery({
        queryKey: ['user-workspaces'],
        queryFn: () => getWorkSpaces()
    })

    await query.prefetchQuery({
        queryKey: ['user-notifications'],
        queryFn: () => getNotifications()
    })
    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen w-screen">
                <Sidebar activeWorkspaceId={workspaceId} />
            </div>
        </HydrationBoundary>
    )
}

export default Layout