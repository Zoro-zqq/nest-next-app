import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { setAuthCache, removeAuthCache, getAuthCache } from '../../utils/cache/auth'
import { CURRENT_COOP_ID } from '../../settings/cacheEnums'
import axios from '../../utils/request'

const initialState = {
  toDoList: [],
  doingList: [],
  doneList: [],
  currentData: null
}

export const createNewCoop = createAsyncThunk(
  'coop/createNewCoop',
  async (credentials: string, thunkAPI) => {
    try {
      const res: {
        allTaskData: Record<string, any>[]
        currentData: Record<string, any>
      } = await axios.post('/coop/createNewCoop', {
        CoopName: '测试流程',
        CoopType: 'pickTask',
        WorkNode: 'scenePick',
        Descript: 'test',
        master: credentials,
        CreateUserID: credentials
      })
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)
export const getAllTask = createAsyncThunk(
  'coop/getAllTask',
  async (credentials: null, thunkAPI) => {
    try {
      const res: Record<string, any>[] = await axios.get('/coop/getAllTask')
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const coopSlice = createSlice({
  name: 'coop',
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<{ toDoList: Array<Record<string, any>> }>) {
      state.toDoList = action.payload.toDoList
    },
    setCurrentData(state, action: PayloadAction<{ CoopID: string; type: string }>) {
      const { type, CoopID } = action.payload
      let data
      switch (type) {
        case 'todo':
          data = state.toDoList
          break
        case 'doing':
          data = state.doingList
          break
        case 'done':
          data = state.doneList
          break
        default:
          data = state.toDoList
          break
      }
      state.currentData = data.find(item => item.CoopID === CoopID).CoopInfo
    }
  },
  extraReducers: builder => {
    builder.addCase(createNewCoop.fulfilled, (state, action) => {
      const { allTaskData, currentData } = action.payload
      let todo = [],
        doing = [],
        done = []
      for (let d of allTaskData) {
        if (d.CoopInfo.CoopStatus === 'End') {
          done.push(d)
        } else if (d.WorkRoles.includes('member')) {
          doing.push(d)
        } else {
          todo.push(d)
        }
      }
      state.toDoList = todo
      state.doingList = doing
      state.doneList = done
      state.currentData = currentData
      setAuthCache(CURRENT_COOP_ID, currentData.CoopID, 3600)
    })
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      const CoopID = getAuthCache(CURRENT_COOP_ID)
      const allTaskData = action.payload
      let todo = [],
        doing = [],
        done = []
      for (let d of allTaskData) {
        if (CoopID && d.CoopID === CoopID) {
          state.currentData = d.CoopInfo
        }
        if (d.CoopInfo.CoopStatus === 'End') {
          done.push(d)
        } else if (d.WorkRoles.includes('member')) {
          doing.push(d)
        } else {
          todo.push(d)
        }
      }
      state.toDoList = todo
      state.doingList = doing
      state.doneList = done
    })
  }
})

export const { setTodoList, setCurrentData } = coopSlice.actions

export default coopSlice.reducer
