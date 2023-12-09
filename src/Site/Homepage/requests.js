const getRecentTournamentsQuery =
{
    "query":
        `query TournamentsByState($perPage: Int, $state: String!) {
            tournaments(query: {
                perPage: 20
            filter: {
                addrState: MA
                afterDate: 1688973146
                beforeDate: 1689736346
                countryCode: "US"
                videogameIds: [
                                1386
                            ]
                    }
                }) {
            nodes {
                id
                name
                addrState
                startAt
                shortSlug
                events {
                    videogame {
                                    id
                                }
                            }
                        }
                    }
                }`
}

export {getRecentTournamentsQuery}