pub struct OnePoleFIR {
    buffer: f64,
    coefficient: f64,
}

pub enum FilterMode {
    HiPass,
    LoPass,
}

impl OnePoleFIR {
    pub fn new(mode: FilterMode) -> Self {
        let coefficient = match mode {
            FilterMode::LoPass => 0.5,
            FilterMode::HiPass => -0.5,
            _ => panic!("Unknown mode"),
        };
        OnePoleFIR {
            buffer: 0.0,
            coefficient,
        }
    }
    fn tick(&mut self, input: f64) -> f64 {
        let output = input * 0.5 + self.buffer * self.coefficient;
        self.buffer = input;
        output
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn lowpass_works() {
        let mut lowpass_filter = super::OnePoleFIR::new(super::FilterMode::LoPass);
        assert_eq!(lowpass_filter.tick(0.0), 0.0);
        assert_eq!(lowpass_filter.tick(1.0), 0.5);
        assert_eq!(lowpass_filter.tick(0.5), 0.75);
        assert_eq!(lowpass_filter.tick(0.0), 0.25);
    }
    #[test]
    fn highpass_works() {
        let mut highpass_filter = super::OnePoleFIR::new(super::FilterMode::HiPass);
        assert_eq!(highpass_filter.tick(0.0), 0.0);
        assert_eq!(highpass_filter.tick(1.0), 0.5);
        assert_eq!(highpass_filter.tick(0.5), -0.25);
        assert_eq!(highpass_filter.tick(0.0), -0.25);
        assert_eq!(highpass_filter.tick(0.0), 0.0);
    }
}