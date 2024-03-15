interface containerProps{
    children:React.ReactNode
}
const Container:React.FC<containerProps> = ({
    children
}) => {
    return ( 
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
     );
}
 
export default Container;