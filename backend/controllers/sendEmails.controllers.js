import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

export const sendEmails = async (req, res) => {
    const { vendors, subject, body } = req.body;
    console.log(vendors, subject, body, "test blabla");
    if (typeof subject !== "string" || typeof body !== "string") {
        return res
            .status(400)
            .json({ error: "Expected { subject: string, body: string }" });
    }

    // collect unique emails
    const emails = vendors.map((vendor) => {
        return vendor.email;
    });

    if (emails.length === 0) {
        return res
            .status(400)
            .json({ error: "No email addresses found to send." });
    }

    emails.push("abhishek.bhatia@aqlix.com");
    console.log(emails, "emails data");

    const sesClient = new SESClient({
        region: process.env.CA_AWS_REGION,
        credentials: {
            accessKeyId: process.env.CA_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.CA_AWS_SECRET_ACCESS_KEY,
        },
    });
    const source = process.env.CA_AWS_SES_SOURCE_EMAIL;
    if (!source) {
        return res
            .status(500)
            .json({ error: "SES_SOURCE_EMAIL not configured." });
    }

    // send individually
    const results = [];
    for (const toAddress of emails) {
        try {
            await sesClient.send(
                new SendEmailCommand({
                    Source: source,
                    Destination: { ToAddresses: [toAddress] },
                    Message: {
                        Subject: { Data: subject },
                        Body: { Text: { Data: body } },
                    },
                }),
            );
            results.push({ to: toAddress, status: "SENT" });
        } catch (e) {
            console.error(`Failed to send to ${toAddress}:`, e);
            results.push({ to: toAddress, status: "FAILED", error: e.message });
        }
    }

    res.json({ results });
};
