import { Redirect, RouteComponentProps } from 'react-router-dom'

// Redirects to mint but only replace the pathname
export function RedirectPathToMintOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/mint' }} />
}

// Redirects from the /mint/:memeURL/:walletAddress path to the /mint?memeUrl=:memeURL&walletAddress=:walletAddress format
// the meme url must have all "/" characters replaced with "%2F" characters.
export function RedirectToMint(props: RouteComponentProps<{ memeURL: string; walletAddress: string }>) {
  const {
    location: { search }
  } = props

  // Handle the case with no wallet address
  props.match.params.walletAddress = props.match.params.walletAddress ? props.match.params.walletAddress : ''

  return (
    <Redirect
      to={{
        ...props.location,
        pathname: '/mint',
        search:
          search && search.length > 1
            ? `${search}&memeURL=${props.match.params.memeURL}&walletAddress=${props.match.params.walletAddress}`
            : `?memeURL=${props.match.params.memeURL}&walletAddress=${props.match.params.walletAddress}`
      }}
    />
  )
}