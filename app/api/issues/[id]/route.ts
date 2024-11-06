import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import authOptions from "../../../auth/authOptions";
import { issuePatchSchema } from "../../../validationSchema";

export async function PATCH(
    request: NextRequest,
    {params}: {params: { id: string}}) {
        const session = await getServerSession(authOptions)
       // if (!session) return NextResponse.json({}, {status: 401})
        
        const body = await request.json()
        const validation = issuePatchSchema.safeParse(body)
        
        if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 })

        const issue = await prisma.issue.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })

        if (!issue)
            return NextResponse.json({error: "Invalid issue"}, {status: 404})

        const { assignedToUserId } = body
        if(assignedToUserId) {
           const userDb = await prisma.user.findUnique({where: {id: assignedToUserId}})
           if(!userDb) {
            return NextResponse.json({error: 'invalid user'}, {status: 400})
           }
        }

        const updatedIssue = await prisma.issue.update({
            where: {
                id: issue.id
            },
            data: {
                title: body.title,
                description: body.description,
                assignedToUserId: assignedToUserId
            }
        })

        return NextResponse.json(updatedIssue)
}

export async function DELETE(
    request: NextRequest,
    {params}: {params: { id: string}}) {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({}, {status: 401})
        
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) 
        return NextResponse.json({error: 'Invalid issue'}, {status: 400})

    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })

    // NextResponse dont have 204 status code
    return  new Response(null, {
        status: 204,
      })

}