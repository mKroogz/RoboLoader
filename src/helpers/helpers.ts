import roboLocations from "../robotData/robotData"

interface Robot {
    robotId: String;
    distanceToGoal: Number;
    batteryLevel: Number;
}

const leastDistanceCalculator = (x:number, y:number) => {
    let bestRobot = {robotId:"", distanceToGoal:1000000000, batteryLevel: 0} as Robot
    roboLocations.forEach(robot => {
        const distance = Math.sqrt(Math.pow(Math.abs(robot.x - x), 2) + Math.pow(Math.abs(robot.y - y), 2))
        if (bestRobot.distanceToGoal <= 10 && distance <= bestRobot.distanceToGoal){
            if (robot.batteryLevel > bestRobot.batteryLevel){
                bestRobot = {robotId:robot.robotId, distanceToGoal:distance, batteryLevel: robot.batteryLevel}
            }
        } else if (distance <= bestRobot.distanceToGoal) {
            bestRobot = {robotId:robot.robotId, distanceToGoal:distance, batteryLevel: robot.batteryLevel}
        }
    })
    return bestRobot;
}

export default leastDistanceCalculator;