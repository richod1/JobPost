import {handleAuth} from '@workos-inc/authkit-nextjs'

// handles callback redirect
//eg"{handleAuth(returnParams:'/home')}

export const GET=handleAuth();