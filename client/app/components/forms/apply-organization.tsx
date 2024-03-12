'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { SecondaryButton } from "../ui/button"
import { Organization } from "../../utils/interfaces"
import applyOrganization from "../../../services/users/applyOrganization"

interface Props {
  token: string | undefined
  userId: string | undefined
  organizations: Organization[]
}

const ApplyOrganizationForm = ({ token, userId, organizations }: Props) => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) 

  const onClick = async (organizationId: string) => {
    setLoading(true)
    try {
      const res = await applyOrganization(token, userId, organizationId)
      if (!res) {
        throw new Error('An error ocurred while applying to the organization')
      }
      router.refresh()
    } catch (error) {
      setErrorMessage('An error ocurred while applying to the organization')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ul className='flex flex-col gap-4'>
      {organizations.map((organization) => {
        return (
          <li key={organization._id} className='flex flex-row gap-8 items-center py-4 px-10 bg-secondary-100 rounded-lg justify-between w-full'>
            <h1 className='text-xl text-secondary-700'>{organization.name}</h1>
            <SecondaryButton 
              type='button' 
              loading={loading} 
              onClick={() => onClick(organization._id)}
            >
              Apply
            </SecondaryButton>
          </li>
        )
      })}
      {errorMessage && <div className="text-xs text-red-500 text-left">{errorMessage}</div>}
    </ul>
    
  )
}

export default ApplyOrganizationForm
