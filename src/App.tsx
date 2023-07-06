import { ConnectButton } from '0xpass';


const App = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: 12,
                boxSizing: 'border-box',
            }}
        >
            <h1 style={{
                fontSize: '30px',
            }}><b>Welcome to 0xpass!</b></h1>
            <br/>
            <ConnectButton />
        </div>
    );
};


export default App;
