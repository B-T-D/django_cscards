import React from 'react';

function TotalCards({ cards }) {
    return(
        <h1>{cards.length} Cards</h1>
    )
}

function FilterButtons({ types }) {
    return (
        <div className="FilterButtons">
            <ul>
                {types.map(item => (
                    <li className="FilterButtons">
                        <button>{item}</button>
                    </li>
                ))}
                <li className="FilterButtons">
                    <button>Known</button>
                </li>
                <li className="FilterButtons">
                    <button>Unknown</button>
                </li>
            </ul>
        </div>
    )
}

export class CardsList extends React.Component {

    render() {
        return (
            <div className="cards-list">
                <TotalCards cards={this.props.cards} />
                <FilterButtons types={this.props.types}/>
                <table>
                    {this.props.cards.map(item => (
                        <tr key={item.id}>
                            <td>
                                <button>Edit</button>
                            </td>
                            <td>
                                <h1>{item.front}</h1>
                                <p>{item.back}</p>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }

}