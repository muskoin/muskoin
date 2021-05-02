import React, { useState, useEffect } from 'react'
import { ethers } from "ethers"
import AppBody from '../AppBody'
import { MintMemeMemelordsTabs } from '../../components/NavigationTabs'
import {  useDarkModeManager } from '../../hooks'
import { withStyles, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import { useWeb3ProviderManager } from '../../hooks'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRightOutlined'
import { colors } from '../../theme'
import MUSKOIN_INTERFACE from '../../constants/abis/Muskoin.json'

// this needs to be set to the address that Muskoin.sol is deployed to
const MUSKOIN_ADDRESS = '0x0EC7Cc9521C56EB6c59d6f93c2dDaF73D2DDd36f'

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const [darkMode, toggleSetDarkMode] = useDarkModeManager()
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight style={{ color: colors(darkMode).text2 }} /> : <KeyboardArrowLeft style={{ color: colors(darkMode).text2 }}  />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        style={{ color: colors(darkMode).text2 }}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft style={{ color: colors(darkMode).text2 }} /> : <KeyboardArrowRight style={{ color: colors(darkMode).text2 }} />}
      </IconButton>
    </div>
  );
}

function createData(index: number, address: string, url: string) {
  return { index, address, url };
}

function formatString(str : string, max : number) {
  if(str.includes("://")) {
    str = str.split("://")[1]
  }
  if(str.includes("www.")) {
    str = str.split("www.")[1]
  }
  if(str.includes("WWW.")) {
    str = str.split("WWW.")[1]
  }
  return str.substr(0,max)
}

const initRows = [
  createData(-1, '', '')
]  

export default function Memelords() {
  // State variables  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [darkMode, toggleSetDarkMode] = useDarkModeManager()
  const [provider, setWeb3Provider] = useWeb3ProviderManager()
  const [quantityNFT, setQuantityNFT] = useState("")
  const [tokenDeployed, setTokenDeployed] = useState(false)
  const [rows, setRows] = useState(initRows)
  const [emptyRows, setEmptyRows] = useState(0)

  // create the muskoin interface
  const muskoin =  Object.keys(provider).length > 0 ? new ethers.Contract(MUSKOIN_ADDRESS, MUSKOIN_INTERFACE.abi, provider) : null
  var rows_mutex = false // false == unlocked
  // chain logic
  const newProvider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum!) : {}

  const updateProvider = async () => {
    if ( (Object.keys(provider).length == 0) ) {
      setWeb3Provider(newProvider)
    }
  }

  window.ethereum ? updateProvider() : console.log("No window.ethereum")

  const updateTokenDeployed = async () => {
    let network = Object.keys(provider).length > 0 ? await provider.getNetwork() : console.log(provider)
    try{
      let contractByteCode = network ? String(await provider.getCode(MUSKOIN_ADDRESS)) : "0x"
      let isContractValid = network ? contractByteCode.length > 3 : false
      console.log("Contract valid: " + String(isContractValid))
      setTokenDeployed(isContractValid)  
    } catch(err) {
      console.log(String(err))
    }
  }

  const updateQuantityNFT = async () => {
    let network = Object.keys(provider).length > 0 ? await provider.getNetwork() : console.log(provider)
    let tempQuantityNFT = network && muskoin ? await muskoin.totalSupply() : console.log(muskoin)
    tempQuantityNFT ? setQuantityNFT(tempQuantityNFT) : console.log(tempQuantityNFT)
  }

  useEffect(() => {
    updateQuantityNFT()
  }, [tokenDeployed])

  // Update chain every 1/2 second
  const updatePeriod = 500 //milliseconds
  const updateFunction = () => {
    if(Object.keys(provider).length > 0) {
      tokenDeployed ? updateQuantityNFT() : updateTokenDeployed()
    }  
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateFunction()
    }, updatePeriod)
    return () => clearInterval(interval)
  }, [])

  // Update the rows if the number of NFTs changed
  useEffect(() => {
    async function localAsyncFunction() { // This local async function is needed for the useEffect handle
      if(!rows_mutex) {
        rows_mutex = true
        var tempRows = []
        for (let i = 0; i < parseInt(quantityNFT); i++) {
          let row_token = muskoin ? await muskoin.tokenByIndex(i) : ""
          let row_address = muskoin && row_token ? await muskoin.ownerOf(row_token) : ""
          let row_uri = muskoin && row_token ? await muskoin.tokenURI(row_token) : ""
          tempRows.push(createData(i,row_address, row_uri))
        }
        setRows(tempRows)
        rows_mutex = false
      }
    }
    // Execute the created function directly
    localAsyncFunction();
  }, [quantityNFT])

  // Update the number of empty rows
  useEffect(() => {
    setEmptyRows(rows ? rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage) : 0)
  }, [rows])

  // Main logic

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const rowsPerPage = parseInt(String(event.target.value), 10)
    setRowsPerPage(rowsPerPage)
    setPage(0)
  };

  const tableStyle =  {
    backgroundColor: colors(darkMode).bg1,
    color: colors(darkMode).text1,
    borderColor: colors(darkMode).text5
  }

  function addHttpIfNecessary(url : string) {
    if(url.toLowerCase().includes('http')) {
      return url
    } else {
      return 'http://' + url
    }
  }

  // Rendering

  return (
    <>
      <MintMemeMemelordsTabs active={'memelords'} />
      <AppBody>
        <TableContainer component={Paper} style={tableStyle}>
          <Table aria-label="MemeLords with their awards" style={tableStyle}>

            <TableHead style={{color: colors(darkMode).text1, borderColor: colors(darkMode).text5 }}>
              <TableRow style={{color: colors(darkMode).text1, borderColor: colors(darkMode).text5 }}>
                <TableCell style={{color: colors(darkMode).text1, borderColor: colors(darkMode).text5 }} align="left">#</TableCell>
                <TableCell style={{color: colors(darkMode).text1, borderColor: colors(darkMode).text5 }}>Address</TableCell>
                <TableCell style={{color: colors(darkMode).text1, borderColor: colors(darkMode).text5 }} align="right">Award URL</TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={tableStyle}>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.index} style={{borderColor: colors(darkMode).text5}}>
                  <TableCell component="th" scope="row" style={tableStyle} align="left">
                    {row.index}
                  </TableCell>
                  <TableCell component="th" scope="row" style={tableStyle}>
                    {
                      <Button style={ { textTransform : 'none', color : colors(darkMode).text1, borderColor: colors(darkMode).text5 } } onClick={() => window ? window!.open('https://www.blockchain.com/eth/address/' + row.address, '_blank')!.focus() : console.log("No window")}>
                        {formatString(row.address,9)}...
                      </Button>
                    }
                  </TableCell>
                  <TableCell align="right" style={tableStyle}>
                    {
                      <Button style={ { textTransform : 'none', color : colors(darkMode).text1, borderColor: colors(darkMode).text5 } } onClick={() => window ? window!.open(addHttpIfNecessary(row.url), '_blank')!.focus() : console.log("No window")}>
                        {formatString(row.url,21)}...
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows , borderColor: colors(darkMode).text5}}>
                  <TableCell colSpan={6} style={{borderColor: colors(darkMode).text5}} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter style={{color: colors(darkMode).text3, borderColor: colors(darkMode).text5}}>
              <TableRow style={{color: colors(darkMode).text3, borderColor: colors(darkMode).text5}}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows ? rows.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  style={{color: colors(darkMode).text3, borderWidth: "0px"}}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </AppBody>
      <div style={{paddingTop: '3em'}}>
      </div>
    </>
  )
}