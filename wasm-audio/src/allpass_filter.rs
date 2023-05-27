use super::delay_line::DelayLine;

pub struct AllPassFilter {
    delay_line: DelayLine,
    feedback: f64,
}

impl AllPassFilter {
    pub fn new(length: usize) -> Self {
        AllPassFilter {
            delay_line: DelayLine::new(length),
            feedback: 0.5,
        }
    }
    pub fn tick(&mut self, input: f64) -> f64 {
        let output = self.delay_line.read() + input * -self.feedback;
        self.delay_line.write_and_advance(input + output * self.feedback);
        output
    }
    pub fn set_feedback(&mut self, value: f64) {
        self.feedback = value;
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn all_pass_test() {
        let mut all_pass = super::AllPassFilter::new(4);
        assert_eq!(all_pass.tick(1.0), -0.5);
        // assert_eq!(all_pass.tick(0.0), 0.5);
    }
}