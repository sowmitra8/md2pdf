import {useEffect,useRef,useState} from 'react';
import mermaid from 'mermaid';

export default function Mermaid({source}){
  const ref=useRef(null);
  const [error,setError]=useState(false);
  useEffect(()=>{
    let active=true;
    (async()=>{
      try{
        mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'default'});
        const id='mermaid-'+Math.random().toString(36).slice(2);
        const result=await mermaid.render(id,source);
        if(active&&ref.current) ref.current.innerHTML=result.svg;
      }catch{if(active)setError(true);}
    })();
    return()=>{active=false};
  },[source]);
  return error?<pre className="mermaid-error">{source}</pre>:<div ref={ref} className="mermaid-diagram" aria-label="Mermaid diagram"/>;
}
