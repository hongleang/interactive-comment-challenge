import React, { useState } from 'react'
import "./VoteButton.css"

type Props = {
    score: number;
    horizontal?: boolean;
}

export default function VoteButton({ score, horizontal }: Props) {
    const [vote, setVote] = useState<number>(score);

    const horVoteBtnStyle: React.CSSProperties = {
        flexDirection: "row",
        maxWidth: "none",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        width: "40%"
    }

    return (
        <div className="vote-btn" style={horizontal ? horVoteBtnStyle : {}}>
            <button className="btn-vote" onClick={() => setVote(vote + 1)}>+</button>
            <div className="vote-number">{vote}</div>
            <button className="btn-vote" onClick={() => setVote(vote - 1)}>-</button>
        </div>
    )
}
