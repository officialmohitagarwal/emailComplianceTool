export const calculateScore = ({
    compliance,
    links,
    images
}) => {

    const weights = {
        compliance: 40,
        links: 30,
        images: 30
    };

    let weightedScore = 0;
    let totalWeight = 0;


    if (
        compliance !== null &&
        compliance !== undefined
    ) {

        weightedScore +=
            compliance * weights.compliance;

        totalWeight += weights.compliance;
    }


    if (
        links !== null &&
        links !== undefined
    ) {

        weightedScore +=
            links * weights.links;

        totalWeight += weights.links;
    }


    if (
        images !== null &&
        images !== undefined
    ) {

        weightedScore +=
            images * weights.images;

        totalWeight += weights.images;
    }


    const score =
        totalWeight === 0
            ? 0
            : Math.round(
                weightedScore / totalWeight
            );


    let status;

    if (score >= 90) {
        status = "excellent";
    } else if (score >= 75) {
        status = "good";
    } else if (score >= 50) {
        status = "needs_attention";
    } else {
        status = "poor";
    }


    return {
        score,
        status
    };

};