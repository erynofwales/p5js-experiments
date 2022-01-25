/// A simple two-dimensional Cartesian Point.
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let length = this.length();
        this.x = this.x / length;
        this.y = this.y / length;
    }

    scale(factor) {
        this.x = this.x * factor;
        this.y = this.y * factor;
    }

    /// Compute the Euclidean distance between @c this.point and the argument.
    /// @see https://en.wikipedia.org/wiki/Euclidean_distance
    distanceTo(point) {
        let x = this.x - point.x;
        let y = this.y - point.y;
        return Math.sqrt(x * x + y * y);
    }
}

const Clamp = {
    Yes: 1,
    No: 0,
}

/// Map an input value in an input range to a value in the output range.
/// @see https://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another
function mapValueInRangeToRange(input, inputStart, inputEnd, outputStart, outputEnd, clamp = Clamp.No) {
    let mappedValue = outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart);

    if (clamp == Clamp.Yes) {
        mappedValue = Math.min(outputEnd, Math.max(outputStart, mappedValue));
    }

    return mappedValue;
}