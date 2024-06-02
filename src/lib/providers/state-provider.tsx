'use client';
//in general we want to have access to the current workspace, folder and file
//throughout the app. we want to be able to dispatch events to update the global state
//and we want to be able to listen to changes in the global state
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
// import { Users } from '../supabase/supabase.types';
// import {CumBet, DoubleSlut, EmojiSlot, Gamble, Profile, TripleSlut} from '../supabase/supabase.types'
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { getCumBetLatest, getDoubleSlutLatest, getEmojiSlotLatest, getLatestGamble, getProfile, getTripleSlutLatest } from '../supabase/queries';
// import { useSupabaseUser } from './supabase-user-provider';
// import { gamble } from '../../../migrations/schema';

export type NewCopyTradingTransaction = {
    id:string;
    token_in_amount: number;
    token_out_amount: number;
    token_in_symbol: string;
    token_out_symbol: string;
    created_at: string;
    tx_id: string;
    swapper_address: string;
    token_in_mint: string;
    token_out_mint: string;
    price_per_token: number;
    swap_description: string;

}

interface AppState {
    // localData: Profile | null;
    // emojiSlotLocal:EmojiSlot | null;
    // doubleSlutLocal:DoubleSlut | null;
    // tripleSlutLocal:TripleSlut | null;
    // gambleLocal:Gamble | null;
    // cumBet:CumBet | null;
    localData:any[] | [];
}

type Action = 
    | {type:"SET_TRANS",payload:NewCopyTradingTransaction[]}
    | {type:"UPDATE_TRANS",payload:NewCopyTradingTransaction[]}
    | {type:"DELETE_TRANS",payload:NewCopyTradingTransaction[]}
    

const initialState: AppState = { localData: [] };

const appReducer = (
    state: AppState = initialState,
    action: Action
  ): AppState => {
    switch (action.type) {
        case "SET_TRANS":
          // console.log("user setted gamw ti poutana m", state, action.payload)
            return { ...state, localData: action.payload };
        case "UPDATE_TRANS":
            return { ...state, localData:action.payload };
        case "DELETE_TRANS":
            return { ...state, localData: action.payload };
        
        default:
            return state;
    }
}

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
      localData: NewCopyTradingTransaction[] | [];
    }
  | undefined
>(undefined);


interface AppStateProviderProps {
    children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState); // the equivalent of useState but for complex states
    //the appReducer is the reducer function which takes the current state and the action and returns the new state
    //the intitial state is the initial state of the global state
    const pathname = usePathname();
    //returns the current pathname of the URL
    const supabase = createClientComponentClient();

    
  
    // const profileId = useMemo(() => {
    //   const urlSegments = pathname?.split('/').filter(Boolean);//split the pathname by / and remove any empty strings
    //   if (urlSegments)
    //     if (urlSegments.length > 1) {
    //       return urlSegments[1];//return the second element of the array
    //     }
    // }, [pathname]);
    //the useMemo hook is used to memorize the value of the workspaceId
    //between renders. It only changes when the pathname changes

    const usLocalData= useMemo(()=>{
      return state.localData
    },[state])
    
    useEffect(() => {
      console.log("state from useEffect: ",state)

      const fetchProfile = async () => {
        const {data, error} = await supabase.from('new_copy_trading_transaction')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(200);
        if (error) {
          console.log('error at setting the transactions in state provider: ',error);
        }
        if (!data) {
            console.log("no data from the transactions")
            return;
        };
        console.log("setting trans data")
        dispatch({
          type: 'SET_TRANS',
          payload: { ...data },
        });
        const channel = supabase.channel('new_copy_trading_transaction')
        .on(
          'postgres_changes', 
            {event:"*",schema:"public",table:"new_copy_trading_transaction"} ,
            (payload) => {
                // console.log("updating inside the state provider, : ",payload)
                // console.log("something from here ig ",payload, 'localData', localData, 'typeof localData', typeof localData)
                // setData(prevData => prevData ? [...prevData, payload.new] : [payload.new]);
                dispatch({
                type:"UPDATE_TRANS",
                payload: {...data, ...payload.new as NewCopyTradingTransaction[]}
                })
            }
        ).subscribe();
        console.log("channel", channel)
      };
      fetchProfile();
    }, [supabase]);//fetch the files when the folderId or the workspaceId changes
    //in order to make it more optimized
  
    useEffect(() => {
      console.log('App State Changed', state);
    }, [state]);
  
    return (
      <AppStateContext.Provider
        value={{ state, dispatch, localData: usLocalData}}
      >
        {children}
      </AppStateContext.Provider>
    );
  };
  //in the workspace-dropdown.tsx we set the state to include
  // the shared, the collaboratin and the private workspaces using 
  // the SET_WORSKPACE action
  export default AppStateProvider;

  
  export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
      throw new Error('useAppState must be used within an AppStateProvider');
    }
    // console.log("contextxxxxxxx: ",context)
    return context;
  };