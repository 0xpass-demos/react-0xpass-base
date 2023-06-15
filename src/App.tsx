import {ConnectButton, useUser} from '0xpass';
import {useAccount} from "wagmi";
import {useEffect, useState} from "react";
import {Layout} from "./components/layout";
import {Label} from "@radix-ui/react-label";
import {cn} from "./components/lib/utils";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {JsonViewer} from "@textea/json-viewer";

const App = () => {
    const { address, isConnected } = useAccount();
    console.log("{ address, isConnected }", { address, isConnected });
    const {
        user,
        isAuthenticated,
        login,
        logout,
        linkFarcaster,
        linkGoogle,
        linkTwitter,
        getAccessToken,
    } = useUser();

    // const {
    //     linkGoogle,
    //     linkTwitter
    // } = useLink()

    console.log("[demo] IS AUTHENTICATED?", isAuthenticated);

    const menuGroups = [
        {
            title: "Authentication",
            items: [
                {
                    title: "user",
                    action: () => {
                        setFunctionOutput(user);
                    },
                },
                {
                    title: "login",
                    action: () => login(),
                },
                {
                    title: "logout",
                    action: () => logout(),
                },
                {
                    title: "getAccessToken",
                    action: async () => {
                        const token = await getAccessToken();
                        setFunctionOutput(token);
                    },
                },
            ],
        },
        {
            title: "Link Accounts",
            items: [
                // {
                //   title: "linkGoogle",
                //   action: () => {
                //     const res = linkGoogle();
                //     setFunctionOutput({
                //       ok: true,
                //     });
                //   },
                // },
                {
                    title: "linkFarcaster",
                    action: () => {
                        const res = linkFarcaster();
                        setFunctionOutput({
                            ok: true,
                        });
                    },
                },
                // {
                //   title: "mockData",
                //   action: () => {
                //     setFunctionOutput(sampleOutput);
                //     setUserObject(sample);
                //   },
                // },
            ],
        },
    ];

    const [functionOutput, setFunctionOutput] = useState({});
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        if (user) {
            setUserObject(user);
        }
    }, [user]);

    return (
        <Layout >
            {!isConnected ? (
                <div className="w-full mx-auto items-center flex flex-col text-center h-full justify-center">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="flex gap-2 flex-col">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            0xPass Demo
                        </h1>
                        <p className="text-slate-600 ">
                            Connect with your wallet to see what&apos;s possible with 0xPass.
                        </p>
                    </div>
                    <div className="mt-4">
                        <ConnectButton />
                    </div>
                </div>
            ) : (
                <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] w-full mt-6">
                    <aside className="hidden w-[200px] flex-col md:flex">
                        <nav className="grid items-start gap-2 mt-2">
                            {menuGroups.map((group) => (
                                <div key={group.title}>
                                    <Label className="text-xs text-slate-400 uppercase">
                                        {group.title}
                                    </Label>
                                    <div className="mt-2">
                                        {group.items.map((item) => (
                                            <span
                                                key={item.title}
                                                className={cn(
                                                    "group flex items-center cursor-pointer rounded-md px-3 py-2 font-mono text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                                )}
                                                onClick={item.action}
                                            >
                        <span>{item.title}</span>
                      </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </aside>
                    <br/>
                    <br/>

                    <main className="flex w-full gap-4 mb-12">
                        <Card className="w-1/2 p-4">
                            <CardHeader title="Functions"/>
                            <CardContent>
                                <Button onClick={() => setFunctionOutput(user?.id)}>User ID</Button>
                                <br/>
                                <Button onClick={() => setFunctionOutput(user?.address)}>Address</Button>
                                <br/>
                                <Button onClick={() => logout()}> Logout</Button>
                                <br/>
                                <Button onClick={async () => {
                                    const token = await getAccessToken();
                                    setFunctionOutput(token);
                                }}>Access Token</Button>
                                <br/>
                                <Button onClick={() => {

                                    const res = linkGoogle()
                                    setFunctionOutput({
                                        ok: true,
                                    });
                                }}> Link Twitter</Button>
                                {/*<br/>*/}
                                {/*<Button onClick={() => logout()}> Logout</Button>*/}
                                {/*<br/>*/}
                                {/*<Button onClick={() => logout()}> Logout</Button>*/}

                            </CardContent>
                        </Card>
                        <Card className="w-1/2 p-4">
                            <CardHeader title="Function Output">
                            </CardHeader>

                            <CardContent>
                                <JsonViewer displaySize={true} value={functionOutput} />
                            </CardContent>
                        </Card>
                        <Card className="w-1/2 p-4">
                            <CardHeader title="User Object">
                                <>User Object</>
                            </CardHeader>

                            <CardContent className="overflow-scroll">
                                <JsonViewer displaySize={true} value={userObject} />
                            </CardContent>
                        </Card>

                        {/*<Card className="w-1/2 p-4">*/}
                        {/*    <CardHeader title="Linking Accounts">*/}
                        {/*    </CardHeader>*/}

                        {/*    <CardContent className="overflow-scroll">*/}
                        {/*        <JsonViewer displaySize={true} value={userObject} />*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                    </main>
                </div>
            )}
        </Layout>
    );
};

export default App;
