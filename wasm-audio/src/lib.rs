use wasm_bindgen::prelude::*;
mod utils;

#[wasm_bindgen]
pub struct BipBypass {
    sample_rate: usize,
}

#[wasm_bindgen]
impl BipBypass {
    pub fn new() -> BipBypass {
        utils::set_panic_hook();
        BipBypass { sample_rate: 44100 }
    }
    pub fn tick(&mut self, input: f32) -> f32 {
        input
    }
}
