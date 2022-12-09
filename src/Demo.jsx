import React, {useState, useRef, useEffect} from 'react'
import {
    styled, Typography, Slider, 
    Paper as unStyledPaper, Stack, Box,  Dialog,  DialogContent, FormControl, InputLabel, Select, MenuItem, Button, InputAdornment,  
} from '@mui/material'
import ImgSrc from './img/BG.png';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import fade from './music/As You Fade Away - NEFFEX.mp3'
import enough from './music/Enough - NEFFEX.mp3'
import immortal from './music/Immortal - NEFFEX.mp3'
import play from './music/Play Dead - NEFFEX.mp3'
import winning from './music/Winning - NEFFEX.mp3'

import { AddCircleOutline, CancelOutlined, Settings } from '@mui/icons-material';
import video from './img/VideoCamera.png'
import PlayBack from './img/PlayBack.png'


const songs = [fade, enough,immortal,play,winning]


const Div = styled('div')(({theme}) => ({
    backgroundColor: 'black',
    backgroundImage: `url(${ImgSrc})`,
    height:'60vh',
    width:'60vw',
}))
const Wrapper = styled('div')(({theme}) => ({
    backgroundColor: 'white',
    width:'60vw',
}))

const Paper = styled(unStyledPaper)(({theme}) => ({
    backgroundColor: '#4c4c4c',
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    padding: theme.spacing(2)
}))

const PSlider = styled(Slider)(({theme, ...props}) => ({
    color: 'silver',
    height: 2,
    '& .MuiSlider-thumb': {
        width: '13px',
        height: '13px',
        display: props.thumbless ? 'none' : 'block',
    },
    '&:hover': {
        cursor: 'auto',
    }
}))

export default function Demo() {
    const player = useRef()
    const progressBar = useRef()

    const [index, setIndex] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [elapsed, setElapsed] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(30)
    const [mute, setMute] = useState(false)
    const [currentSong] = useState(songs[index])
    const [readMore,setReadMore]=useState(true)
    const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [speed,setSpeed]=useState('1x')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      event.target.value,
    );
  };
  const handleSpeedChange = (event) => {
    setSpeed(
      event.target.value,
    );
  };

 
    useEffect(() => {
        
        if(isPlaying) {
            setInterval(() => {
                const duration = Math.floor(player?.current?.duration)
                const elapsedTime = Math.floor(player?.current?.currentTime)

                setDuration(duration)
                setElapsed(elapsedTime)

                if(elapsedTime === duration){
                    setIsPlaying(false)
                    player.current.stop()
                }
            }, 100);
        }

        if(player){
            player.current.volume = volume / 100
        }

    },[
        player?.current?.loadedmetadata, 
        player?.current?.readyState, 
        isPlaying, volume 
    ])

    const calculateTime = (value) => {
        const minutes = Math.floor(value / 60) < 10 ? `0${Math.floor(value / 60)}` : Math.floor(value / 60)

        const seconds = Math.floor(value % 60) < 10 ? `0${Math.floor(value % 60)}` : Math.floor(value % 60)

        return `${minutes}:${seconds}`
    }

    const togglePausePlay = () => {
        const prevVal = isPlaying;
        setIsPlaying(!prevVal)

        if(!prevVal){
            player.current.play()
        } else {
            player.current.pause()
        }
    }
    const handleForward = () => {
        player.current.currentTime += 10
    }

    const handleReverse = () => {
        player.current.currentTime -= 10
    }

    const togglePrev = () =>{
        if(index > 0){
            setIndex(prev => prev - 1)
            player.current.src = songs[index - 1]
            player.current.play()
        }
    }

    const toggleNext = () =>{
        //player.current.stop()
        if(index >= songs.length - 1){
            setIndex(0)
            player.current.src = songs[0]
            player.current.play()
        } else {
            setIndex(prev => prev + 1)
            player.current.src = songs[index + 1]
            player.current.play()
        }
    }

    function VolumeBtn () {
        return mute 
            ? <VolumeOffIcon sx={{color: 'silver', '&:hover': {color:'white'}}} onClick={() => setMute(!mute)}/> 
            : volume <= 20 ? <VolumeMuteIcon sx={{color: 'silver', '&:hover': {color:'white'}}} onClick={() => setMute(!mute)}/> 
            : volume <= 75 ? <VolumeDownIcon sx={{color: 'silver', '&:hover': {color:'white'}}} onClick={() => setMute(!mute)}/> 
            : <VolumeUpIcon sx={{color: 'silver', '&:hover': {color:'white'}}} onClick={() => setMute(!mute)}/>
    }
    return (
        <>
        <Div sx={{marginTop:'6rem',borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
        <Box sx={{
                        display: 'flex', 
                        padding:"5px",
                        justifyContent: 'flex-end', 
                        alignItems: 'center'
                    }}>
                       <CancelOutlined sx={{color: 'silver'}} />
                    </Box>
        
            <Paper sx={{marginTop:'18rem',borderRadius:'20px'}}>
            <Stack spacing={1} direction='row' sx={{
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center'
                }}>
                    <Typography sx={{color: 'silver'}}>{calculateTime(elapsed)}</Typography>
                    <PSlider  value={elapsed} max={duration} thumbless ref={progressBar} />
                    <Typography sx={{color: 'silver'}}>{calculateTime(duration - elapsed)}</Typography>
                </Stack>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <audio src={currentSong} ref={player} muted={mute}/>

                    <Stack direction='row' spacing={1} sx={{
                        display: 'flex', 
                        justifyContent: 'flex-start', 
                        width: '25%',
                        alignItems: 'center'
                    }}>
                        <VolumeBtn />
                        <Slider 
                            min={0} value={volume} max={100} 
                            onChange={e => setVolume(e.target.value)} 
                        />
                    </Stack>

                    <Stack direction='row' spacing={1} sx={{
                        display: 'flex', 
                        //justifyContent: 'center', 
                        width: '40%',
                        alignItems: 'center'
                    }}>
                        <SkipPreviousIcon 
                            sx={{color: 'silver', '&:hover': {color:'white'}}}
                            onClick={togglePrev} 
                        />
                        <FastRewindIcon 
                            sx={{color: 'silver', '&:hover': {color:'white'}}}
                            onClick={handleReverse} 
                        />
                        {!isPlaying 
                            ?   <PlayArrowIcon 
                                    sx={{color: 'silver', '&:hover': {color:'white'}}} 
                                    fontSize={'large'} 
                                    onClick={togglePausePlay}
                                />
                            :   <PauseIcon 
                                    sx={{color: 'silver', '&:hover': {color:'white'}}} 
                                    fontSize={'large'} 
                                    onClick={togglePausePlay}
                                />
                        }
                        <FastForwardIcon 
                            sx={{color: 'silver', '&:hover': {color:'white'}}} 
                            onClick={handleForward}
                        />
                        <SkipNextIcon 
                            sx={{color: 'silver', '&:hover': {color:'white'}}} 
                            onClick={toggleNext}
                        />
                    </Stack>
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center'
                    }}>
                       <AddCircleOutline sx={{color: 'silver',marginRight:'5px'}} /> <Settings sx={{color: 'silver','&:hover': {color:'white'}}} onClick={handleClickOpen}/>
                    </Box>
                </Box>
               
            </Paper>
        </Div>
        <Wrapper sx={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}>
        <h4 style={{marginLeft:'10px'}}><b>Headlines: Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestiae...</b> </h4>
        {readMore && <p className='showContent'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima ipsum suscipit at vero aperiam ipsam placeat. Omnis animi eos, quasi architecto tenetur ratione nesciunt magnam
         quos voluptatibus neque delectus rerum, vitae mollitia!...</p>}
         <Button style={{color:"#00FFFF",float:"right",marginBottom:'10px',padding:"10px",cursor:'pointer'}} onClick={()=>setReadMore(!readMore)}>{readMore === true ? "Read Less" : "Read More"}</Button>
        
        </Wrapper>

       {open &&  <Dialog
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        
        <DialogContent sx={{ backgroundColor:'#1E1E1E'}}>
          
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '250px',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120,borderColor:'silver' }}>
              <InputLabel htmlFor="max-width" style={{color:'silver'}} > <img src={video} alt="camera" style={{width:'14px',padding:'3px'}}/>Quality</InputLabel>
              <Select
          
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="Quality"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
                style={{color:'silver'}}
              >
                <MenuItem value={false} style={{backgroundColor:'#4c4c4c',color:'silver'}}>Auto</MenuItem>
                <MenuItem value="xs" style={{backgroundColor:'#656464',color:'silver'}}>1080p</MenuItem>
                <MenuItem value="sm" style={{backgroundColor:'#4c4c4c',color:'silver'}}>720p</MenuItem>
                <MenuItem value="md" style={{backgroundColor:'#656464',color:'silver'}}>480p</MenuItem>
                <MenuItem value="lg" style={{backgroundColor:'#4c4c4c',color:'silver'}}>360p</MenuItem>
                <MenuItem value="xl" style={{backgroundColor:'#656464',color:'silver'}}>240p</MenuItem>
              </Select>
            </FormControl>
           
          </Box>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '250px',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }} >
              <InputLabel htmlFor="max-width" style={{color:'silver'}}> <img src={PlayBack} alt="plybk" style={{width:'14px',padding:'3px'}}/>Playback Speed</InputLabel>
              <Select
                autoFocus
                value={speed}
                onChange={handleSpeedChange}
                label="Playback Speed"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
                style={{color:'silver'}}
              >
                <MenuItem value={false} style={{backgroundColor:'#4c4c4c',color:'silver'}}>0.25x</MenuItem>
                <MenuItem value="0.5x" style={{backgroundColor:'#656464',color:'silver'}}>0.5x</MenuItem>
                <MenuItem value="0.75x" style={{backgroundColor:'#4c4c4c',color:'silver'}} >0.75x</MenuItem>
                <MenuItem value="1x" style={{backgroundColor:'#656464',color:'silver'}}>1x</MenuItem>
                <MenuItem value="1.25x" style={{backgroundColor:'#4c4c4c',color:'silver'}}>1.25x</MenuItem>
                <MenuItem value="1.5x" style={{backgroundColor:'#656464',color:'silver'}}>1.5x</MenuItem>
                <MenuItem value="1.75x" style={{backgroundColor:'#4c4c4c',color:'silver'}}>1.75x</MenuItem>
                <MenuItem value="2x" style={{backgroundColor:'#656464',color:'silver'}}>2x</MenuItem>
              </Select>
            </FormControl>
           
          </Box>
        </DialogContent>
        
      </Dialog>}
        </>
    )
}



