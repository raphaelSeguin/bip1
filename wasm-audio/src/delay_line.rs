pub struct DelayLine {
    buffer: Vec<f64>,
    index: usize
}

impl DelayLine {
    pub fn new(length: usize) -> Self {
        DelayLine {
            buffer: vec![0.0; length],
            index: 0,
        }
    }
    pub fn write_and_advance(&mut self, value: f64) {
        self.buffer[self.index] = value;
        self.index = if self.index == self.buffer.len() - 1 {
            0
        } else {
            self.index + 1
        };
    }
    pub fn read(&self) -> f64 {
        self.buffer[self.index]
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_writes_and_read() {
        let mut line = super::DelayLine::new(4);
        // 1
        assert_eq!(line.read(), 0.);
        line.write_and_advance(1.);
       
        // 2
        assert_eq!(line.read(), 0.);
        line.write_and_advance(2.);

        // 3
        assert_eq!(line.read(), 0.);
        line.write_and_advance(3.);

        // 4
        assert_eq!(line.read(), 0.);
        line.write_and_advance(4.);
        
        // 5 echo de 1
        assert_eq!(line.read(), 1.);
        line.write_and_advance(5.);
    }
}