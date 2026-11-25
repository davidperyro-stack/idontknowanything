
export default async function handler(req, res) {

    if (req.method === "GET") {

        try {

            const response = await fetch(
                `${process.env.SUPABASE_URL}/rest/v1/guestbook_messages?select=*&order=created_at.desc`,
                {
                    headers: {
                        apikey: process.env.SUPABASE_PUBLISHABLE_KEY,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Could not load messages.");
            }

            const messages = await response.json();

            return res.status(200).json(messages);

        } catch (error) {

            return res.status(500).json({
                error: "Could not load messages.",
            });

        }
    }

    if (req.method === "POST") {

        try {

            const { name, message } = req.body;

            if (!name || !message) {
                return res.status(400).json({
                    error: "FILL BOTH FIELDS. NOW.",
                });
            }

            const cleanName = name.trim();
            const cleanMessage = message.trim();

            if (!cleanName || !cleanMessage) {
                return res.status(400).json({
                    error: "i dont want oxygen messages.",
                });
            }

            if (cleanName.length > 30 || cleanMessage.length > 300) {
                return res.status(400).json({
                    error: "im not reading allat :skull:",
                });
            }

            const response = await fetch(
                `${process.env.SUPABASE_URL}/rest/v1/guestbook_messages`,
                {
                    method: "POST",
                    headers: {
                        apikey: process.env.SUPABASE_PUBLISHABLE_KEY,
                        "Content-Type": "application/json",
                        Prefer: "return=representation",
                    },
                    body: JSON.stringify({
                        name: cleanName,
                        message: cleanMessage,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({
                    error: "Could not submit your message.",
                });
            }

            return res.status(201).json(result);

        } catch (error) {

            return res.status(500).json({
                error: "Something went wrong. maybe you destroyed my code, maybe im just stupid idk",
            });

        }
    }

    return res.status(405).json({
        error: "Method not allowed. lol",
    });
}
