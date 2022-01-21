import { useState, useMemo } from 'react';
// The below hook Component was developed with an aim to return the dimensions of the component 
// on the Window of the Browser

const getTagDimensions  = (tagName) => {
   let eleDimensions = {}
   window.onloadedmetadata = function() {
      let element = document.querySelector(tagName);
      eleDimensions = Object.assign({},{
         width:element.clientWidth,
         height:element.clientHeight
      })
      return {...eleDimensions}  
   }
}
const useComponentDimensions = (tagname) => {
   const [eleHeight,setEleHeight] = useState(0)
   const [eleWidth,setEleWidth] = useState(0)
   // eslint-disable-next-line
   const [dimensions,setNewDimesions] = useState(null)
   
   useMemo(() => {
      function getDimen() { 
         let dimension = document.querySelector(tagname).getBoundingClientRect()
         setEleWidth(document.querySelector(tagname).clientWidth)
         setEleHeight(document.querySelector(tagname).clientHeight)   
         setNewDimesions(dimension)
         getTagDimensions(tagname)
      }
      window.addEventListener('load',getDimen)  

      return () => window.removeEventListener('load',getDimen)   
   // eslint-disable-next-line
   },[eleWidth,eleHeight,tagname])

   return {eleWidth,eleHeight}
}
export default useComponentDimensions;