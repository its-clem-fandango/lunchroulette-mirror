import users from "./db/mockUserData";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    lastMatched: string | null;
    isAvailableToday: boolean;
    matchId: string | null;
}
type Pair = [string, string | null];

function filterAvailableUsers(users: User[]): User[] {
    return users.filter(user => user.isAvailableToday);
}

function shuffleUsers(users: User[]): User[] {
    let shuffled = [...users];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createRandomUserPairs(users: User[]): Pair[] {
    let availableUsers = filterAvailableUsers(users);
    let shuffledUsers = shuffleUsers(availableUsers);
    let userPairs: Pair[] = [];

    for (let i = 0; i < shuffledUsers.length; i += 2) {
        const secondUserId = (i + 1) < shuffledUsers.length ? shuffledUsers[i + 1].id : null;
        userPairs.push([shuffledUsers[i].id, secondUserId]);
    }

    return userPairs;
}

function updateUsersWithPairInfo(pairs: Pair[], users: User[]): User[] {
    let currentDate = new Date().toISOString();
    let updatedUsers = [...users];

    for (const pair of pairs) {
        const [user1Id, user2Id] = pair;

        let user1Index = updatedUsers.findIndex(user => user.id === user1Id);
        if (user1Index !== -1 && user2Id) {
            updatedUsers[user1Index] = {
                ...updatedUsers[user1Index],
                matchId: user2Id,
                lastMatched: currentDate
            };
        }

        if (user2Id) {
            let user2Index = updatedUsers.findIndex(user => user.id === user2Id);
            if (user2Index !== -1) {
                updatedUsers[user2Index] = {
                    ...updatedUsers[user2Index],
                    matchId: user1Id,
                    lastMatched: currentDate
                };
            }
        }
    }

    return updatedUsers;
}

export default function createMatches(users: User[]): User[] {
    const filteredUsers = filterAvailableUsers(users)
    const shuffledUsers = shuffleUsers(filteredUsers)
    const arrayOfPairs = createRandomUserPairs(shuffledUsers)
    return updateUsersWithPairInfo(arrayOfPairs, users)
}


// Example usage
const usersData: User[] = [
    // ... user data ...
];

const pairedUsers = createMatches(usersData);
console.log(pairedUsers);
