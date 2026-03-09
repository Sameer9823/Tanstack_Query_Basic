let users =[
    {
        id: 1,
        name: "John Doe",
        email: "TtKZj@example.com",
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "BZu4o@example.com",
    },
    {
        id: 3,
        name: "Bob Smith",
        email: "F2Tb3@example.com",
    }
]

export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Response(JSON.stringify(users), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const { name, email } = await request.json();
    const newUser = {
        id: users.length + 1,
        name,
        email,
    };
    users.push(newUser);
    return new Response(JSON.stringify(newUser), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}