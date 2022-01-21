import { useState, useEffect } from 'react';
import { Prompt } from 'react-router';
const initBeforeUnload = (showSavedExitPrompt) => {
   window.onbeforeunload = (event) => {
      if(showSavedExitPrompt){
         const e = event || window.event;
         e.stopPropogation();
         e.preventDefault();
         if(e){
            e.returnValue = ''
         }
         return <Prompt when={showSavedExitPrompt} message='Are you Sure you want to leave without saving Changes' />
         // return '';
      }
   }
}
export default function useUnsavedExitPrompt(boolValue){
   const [showSavedExitPrompt,setShowSavedExitPrompt] = useState(boolValue);
   window.onload = function () { 
      initBeforeUnload(showSavedExitPrompt)
   }
   useEffect(() => {
      initBeforeUnload(showSavedExitPrompt);
   },[showSavedExitPrompt])
   return [showSavedExitPrompt,setShowSavedExitPrompt]
}