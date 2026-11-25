
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

            const result = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({
                    error: result.message || "Could not load messages.",
                });
            }

            return res.status(200).json(result);

        } catch (error) {

            return res.status(500).json({
                error: error.message || "Something went wrong while loading messages.",
            });

        }
    }

    if (req.method === "POST") {

        try {

            const { name, message } = req.body;

            if (!name || !message) {
                return res.status(400).json({
                    error: "Please fill in both fields.",
                });
            }

            const cleanName = name.trim();
            const cleanMessage = message.trim();

            if (!cleanName || !cleanMessage) {
                return res.status(400).json({
                    error: "Both fields must contain text.",
                });
            }

            if (cleanName.length > 30 || cleanMessage.length > 300) {
                return res.status(400).json({
                    error: "Name must be under 30 characters and message under 300.",
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
                    error: result.message || "Unknown Supabase error.",
                });
            }

            return res.status(201).json(result);

        } catch (error) {

            return res.status(500).json({
                error: error.message || "Something went wrong while submitting your message.",
            });

        }
    }

    return res.status(405).json({
        error: "Method not allowed.",
    });
}
