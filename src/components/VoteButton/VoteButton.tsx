import React, { useState } from 'react'
import "./VoteButton.css"

type Props = {
    score: number;
}

export default function VoteButton({ score }: Props) {
    const [vote, setVote] = useState<number>(score);

    return (
        <div className="vote-btn">
            <button className="btn-vote" onClick={() => setVote(vote + 1)}>+</button>
            <div className="vote-number">{vote}</div>
            <button className="btn-vote" onClick={() => setVote(vote - 1)}>-</button>
        </div>
    )
}
