'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "../../utils/interfaces";
import { PrimaryButton, SecondaryButton } from "../ui/button";
import approvedIntoAnOrganization from "../../../services/users/approvedIntoAnOrganization";
import makeAdminOfAnOrganization from "../../../services/users/makeAdmin";

interface Props {
  token: string | undefined;
  organizationUsers: User[];
  organizationId: string;
  currentUser: User;
}

const ApproveUsers = ({ 
  token, 
  organizationUsers, 
  organizationId,
  currentUser
}: Props) => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const approveUser = async (userId: string) => {
    setLoading(true)
    try {
      const res = await approvedIntoAnOrganization(token, userId, organizationId)
      if (!res) {
        throw new Error('An error ocurred while approving the user')
      }
      router.refresh()
    } catch (error) {
      setErrorMessage('An error ocurred while approving the user')
    }
    setLoading(false)
  }

  const makeAdmin = async (userId: string) => {
    setLoading(true)
    try {
      const res = await makeAdminOfAnOrganization(token, userId, organizationId)
      if (!res) {
        throw new Error('An error ocurred while approving the user')
      }
      router.refresh()
    } catch (error) {
      setErrorMessage('An error ocurred while approving the user')
    }
    setLoading(false)
  }

  return (
    <ul className='flex flex-col gap-4'>
      {organizationUsers.map((organizationUser) => {
        return (
          <li key={organizationUser._id} className='grid grid-cols-2 gap-8 items-center py-4 px-10 bg-primary-100 rounded-lg'>
            <h1 className='text-xl text-primary-700'>{organizationUser.name}</h1>
            {!organizationUser.isApproved ?
              (currentUser.admin ? (
                <PrimaryButton 
                  type='button' 
                  loading={loading} 
                  onClick={() => approveUser(organizationUser._id)}
                >
                  Approve
                </PrimaryButton>
              ) : (
                <PrimaryButton 
                  type='button' 
                  disabled
                >
                  Waiting for approval
                </PrimaryButton>
              )) : (
                <></>
              )
            }
            {currentUser.admin && !organizationUser.admin && organizationUser.isApproved &&
              <SecondaryButton 
                type='button' 
                loading={loading} 
                onClick={() => makeAdmin(organizationUser._id)}
              >
                Make Admin
              </SecondaryButton>
            }
          </li>
        )
      })}
      {errorMessage && <div className="text-xs text-red-500 text-left">{errorMessage}</div>}
    </ul>
  )
}

export default ApproveUsers;