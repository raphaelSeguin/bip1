use super::delay_line::DelayLine;

pub struct CombFilter {
    delay_line: DelayLine,
    feedback: f64,
}

impl CombFilter {
    pub fn new(length: usize) -> Self {
        CombFilter {
            delay_line: DelayLine::new(length),
            feedback: 0.
        }
    }
    pub fn set_feedback(&mut self, value: f64) {
        self.feedback = value;
    }
    pub fn tick(&mut self, input: f64) -> f64 {
        let output = self.delay_line.read();
        self.delay_line.write_and_advance(output * self.feedback + input);
        output
    }
}


#[cfg(test)]
mod tests {
    #[test]
    fn if_works() {
        let mut comb = super::CombFilter::new(2);
        comb.set_feedback(0.5);
        assert_eq!(comb.tick(1.0), 0.0);
        assert_eq!(comb.tick(0.0), 0.0);
        assert_eq!(comb.tick(0.0), 1.0);
        assert_eq!(comb.tick(0.0), 0.0);
        assert_eq!(comb.tick(0.0), 0.5);
        assert_eq!(comb.tick(0.0), 0.0);
        assert_eq!(comb.tick(0.0), 0.25);
        assert_eq!(comb.tick(0.0), 0.0);
        assert_eq!(comb.tick(0.0), 0.125);
        assert_eq!(comb.tick(0.0), 0.0);
    }
}