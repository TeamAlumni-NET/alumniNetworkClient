import { useTheme } from "@emotion/react"
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material"
import {
  LocalizationProvider,
  fiFI,
  MobileDateTimePicker,
} from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postNewEvent } from "../../../reducers/eventsSlice"
import { getGroupAsList } from "../../../reducers/groupsSlice"
import { getTopicAsList } from "../../../reducers/topicsSlice"
import { strings } from "../../../utils/localization"

/**
 * Element to display CreateEventPage component
 * @param {Boolean} openDialogEvent Defines if this component is shown.
 * @param {ReferenceState} setOpenDialogEvent For closing this component.
 * @returns {JSX.Element} Rendered CreateEventPage
 */
const CreateEventPage = ({ openDialogEvent, setOpenDialogEvent }) => {
  const dispatch = useDispatch()
  const { groups } = useSelector((state) => state.groupList)
  const { topics } = useSelector((state) => state.topicList)
  const [endingTimeChecked, setEndingTimeChecked] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [userGroups, userTopics] = [
    [...groups].filter((g) => g.isMember),
    [...topics].filter((g) => g.isMember),
  ]
  const initialState = {
    name: null,
    description: "",
    allowGuests: true,
    startTime: new Date(),
    endTime: null,
    eventCreatorId: JSON.parse(localStorage.getItem("currentUser")).id,
    topics: [],
    groups: [],
  }

  const [newEvent, setNewEvent] = useState(initialState)

  useEffect(() => {
    dispatch(getGroupAsList())
    dispatch(getTopicAsList())
  }, [dispatch])

  /**
   * Closes this component and sets parameters to default
   * @returns {void}
   */
  const handleClose = () => {
    setOpenDialogEvent(false)
    setNewEvent(initialState)
  }
  /**
   * Submits new event
   * @returns {void}
   */
  const handleSubmit = () => {
    dispatch(postNewEvent(newEvent))
    handleClose()
  }
  return (
    <Dialog
      open={openDialogEvent}
      onClose={handleClose}
      fullScreen={fullScreen}
    >
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <DialogTitle>{strings.createEvent.title}</DialogTitle>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "500px",
          }}
        >
          <TextField
            label={strings.createEvent.eventName}
            required
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setNewEvent((newEvent) => ({
                ...newEvent,
                name: e.target.value,
              }))
            }
          />

          <TextField
            label={strings.createEvent.description}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            defaultValue=""
            onChange={(e) =>
              setNewEvent((newEvent) => ({
                ...newEvent,
                description: e.target.value,
              }))
            }
          />

          <FormControl fullWidth>
            <InputLabel id="GroupLabel">{strings.createEvent.group}</InputLabel>
            <Select
              labelId="GroupLabel"
              label={strings.createEvent.group}
              disabled={newEvent.topics.lenght > 0}
              onChange={(e) =>
                setNewEvent((newEvent) => ({
                  ...newEvent,
                  groups: [e.target.value],
                }))
              }
            >
              {userGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="TopicLabel">{strings.createEvent.topic}</InputLabel>
            <Select
              labelId="TopicLabel"
              label={strings.createEvent.topic}
              disabled={newEvent.groups.lenght > 0}
              onChange={(e) =>
                setNewEvent((newEvent) => ({
                  ...newEvent,
                  topics: [e.target.value],
                }))
              }
            >
              {userTopics.map((topic) => (
                <MenuItem key={topic.id} value={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: "10px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={fiFI}>
              <MobileDateTimePicker
                required
                sx={{ width: "100%" }}
                label="Start"
                defaultValue={dayjs(new Date())}
                onChange={(newValue) =>
                  setNewEvent((newEvent) => ({
                    ...newEvent,
                    startTime: newValue.$d,
                  }))
                }
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={fiFI}>
              <MobileDateTimePicker
                sx={{ width: "100%" }}
                label="End"
                disabled={endingTimeChecked === false}
                defaultValue={dayjs(new Date())}
                onChange={(newValue) =>
                  setNewEvent((newEvent) => ({
                    ...newEvent,
                    endTime: newValue.$d,
                  }))
                }
              />
            </LocalizationProvider>
          </Box>

          <FormControlLabel
            label={strings.createEvent.endTime}
            labelPlacement="end"
            control={
              <Checkbox
                checked={endingTimeChecked}
                onChange={(e) => setEndingTimeChecked(e.target.checked)}
              />
            }
          />

          <FormControlLabel
            label={strings.createEvent.joining}
            labelPlacement="end"
            control={
              <Checkbox
                checked={newEvent.allowGuests}
                onChange={(e) =>
                  setNewEvent((newEvent) => ({
                    ...newEvent,
                    allowGuests: e.target.checked,
                  }))
                }
              />
            }
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>{strings.common.cancel}</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {strings.createEvent.createEvent}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateEventPage
