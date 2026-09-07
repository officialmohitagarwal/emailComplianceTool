import { analyzeEmailService } from "../services/compliance.service.js";

export const analyzeEmail = async (req, res) => {

    try {

        const {
            html,
            jurisdictions,
            senderEmail,
            consent
        } = req.body;


        const result = await analyzeEmailService({
            html,
            jurisdictions,
            senderEmail,
            consent
        });


        res.status(200).json({
            success: true,
            result
        });

    } catch (err) {

        console.error(
            "EMAIL ANALYSIS ERROR:",
            err
        );

        res.status(500).json({
            success: false,
            error: err.message
        });

    }
};