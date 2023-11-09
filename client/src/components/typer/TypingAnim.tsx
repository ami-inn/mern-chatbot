
import {TypeAnimation} from 'react-type-animation'

const TypingAnim = () => {
  return (
<div>
  <TypeAnimation
    preRenderFirstString={true}
    sequence={[
    //   100,
      'Chat wiht our AI',
      1000,
      'Buil With open Ai 😎',
      2000,
      'Your own customized chatgpt',
      1500,
    ]}
    speed={50}
    style={{ fontSize: '60px',color:"white", display:"inline-block",textShadow:"1px 1px 20px #000" }}
    repeat={Infinity}
  />
</div>
  )
}

export default TypingAnim
